<script>
  import { onMount, tick } from 'svelte';
  import { CONFIG } from '../config.js';
  import { createChat } from '../lib/share.svelte.js';
  import Icon from './Icon.svelte';
  import avatar from '../assets/avatar.webp';

  // A texting-style thread for finders who'd rather not call. Notes and map pins go to the
  // owner through the relay; with no relay set up, each one becomes a prefilled text instead.
  let { onclose } = $props();
  const { owner, dog } = CONFIG;
  const chat = createChat();
  const STATUS = { locating: 'Finding this spot…', sending: 'Sending…', delivered: 'Delivered', preview: 'Preview: not actually sent' };
  let dialog;
  let thread;
  let input;

  onMount(() => dialog.showModal());
  const close = () => dialog.close();

  // Keep the newest message in view, like a messaging app.
  $effect(() => {
    chat.messages.length;
    tick().then(() => thread?.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' }));
  });

  function suggest(text) {
    chat.draft = text;
    input.focus();
  }

  function onKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      chat.send();
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="chat" bind:this={dialog} {onclose} aria-labelledby="chat-title" onclick={(event) => event.target === dialog && close()}>
  <div class="chat__frame">
    <header class="chat__head">
      <img class="chat__avatar" src={avatar} alt="" width="40" height="40" />
      <div class="chat__who">
        <h2 id="chat-title" class="chat__title">Message {owner.name}</h2>
        <p class="chat__sub">Private. Your number stays hidden unless you share it.</p>
      </div>
      <button type="button" class="chat__close" onclick={close} aria-label="Close"><Icon name="close" /></button>
    </header>

    <div class="chat__thread" bind:this={thread} role="log" aria-live="polite">
      {#each chat.messages as message (message.id)}
        <div class="msg msg--{message.from}">
          {#if message.kind === 'spot'}
            <div class="msg__bubble msg__bubble--spot">
              <div class="msg__map"><span class="msg__pin"><Icon name="pin" /></span></div>
              <p class="msg__caption">
                {#if message.map}This spot <a href={message.map} target="_blank" rel="noreferrer">Open in Maps</a>{:else}Map pin{/if}
              </p>
            </div>
          {:else}
            <p class="msg__bubble">{message.text}</p>
          {/if}

          {#if message.from === 'me'}
            <p class="msg__status">
              {#if message.status === 'text'}
                <a href={message.href}>Send as a text</a>
              {:else if message.status === 'failed'}
                {message.error ?? "Didn't send."} <a href={message.href}>Text instead</a>
              {:else}
                {STATUS[message.status]}
              {/if}
            </p>
          {/if}
        </div>
      {/each}
    </div>

    <div class="chat__replies">
      <button type="button" class="chat__chip" onclick={chat.shareSpot} disabled={chat.locating}><Icon name="pin" />Share this spot</button>
      <button type="button" class="chat__chip" onclick={() => suggest(`I have ${dog.name} safe with me.`)}>I have {dog.name} safe</button>
      <button type="button" class="chat__chip" onclick={() => suggest('Please call me back at ')}>Call me back</button>
    </div>

    <div class="chat__composer">
      <button type="button" class="chat__attach" onclick={chat.shareSpot} disabled={chat.locating} aria-label="Share this spot">
        <Icon name={chat.locating ? 'spinner' : 'pin'} class={chat.locating ? 'spin' : ''} />
      </button>
      <textarea bind:this={input} bind:value={chat.draft} rows="1" placeholder="Message {owner.name}…" aria-label="Message" onkeydown={onKeydown}></textarea>
      <button type="button" class="chat__send" onclick={chat.send} disabled={!chat.draft.trim()} aria-label="Send"><Icon name="up" /></button>
    </div>
  </div>
</dialog>
