<script>
  import { CONFIG } from '../config.js';
  import { hello, smsHref, telHref } from '../lib/contact.js';

  const people = CONFIG.contacts.filter((person) => person.phone);
  const { microchip } = CONFIG.dog;
</script>

{#if people.length || microchip}
  <section class="contacts-section" aria-labelledby="contacts-title">
    <h2 id="contacts-title" class="section__title">If {CONFIG.owner.name} doesn't answer</h2>
    <ul class="contacts">
      {#each people as person (person.name)}
        <li class="contact">
          <div>
            <p class="contact__name">{person.name}</p>
            {#if person.note}<p class="contact__note">{person.note}</p>{/if}
          </div>
          <div class="contact__actions">
            <a class="chip" href={telHref(person.phone)}>Call</a>
            {#if person.canText}<a class="chip" href={smsHref(person.phone, hello())}>Text</a>{/if}
          </div>
        </li>
      {/each}
    </ul>
    {#if microchip}
      <p class="contacts__aside">Any vet clinic or animal shelter can scan my microchip ({microchip}) to find my family.</p>
    {/if}
  </section>
{/if}
