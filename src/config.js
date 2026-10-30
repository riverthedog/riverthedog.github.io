// Everything personal lives here. Edit, commit, push, and GitHub Pages redeploys.
// Phone numbers can be written any way, like '(760) 123-4567'; the page formats them.
export const CONFIG = {
  dog: {
    name: 'River',
    microchip: '', // optional; nothing shows on the page while it's empty
  },

  owner: { name: 'my person', phone: '(760) 500-0166' },

  // Shown under "If my person doesn't answer". Add people as you go.
  contacts: [
    { name: 'Backup contact', note: 'Lives in Escondido', phone: '(760) 500-4010', canText: true },
  ],

  // Shown under "Good to know", in River's voice.
  notes: [
    { lead: 'I come to my name.', text: "Crouch down and call me in a happy voice. Please don't chase me." },
    { lead: "I'm very loyal to my person.", text: "If she's not with me, I'll try to go find her, so please keep me on a leash or behind a closed door until she gets here." },
    { lead: "I'm friendly with dogs and cats.", text: "If you have pets at home, it's okay to bring me inside while you wait." },
    { lead: 'I live in San Clemente.', text: 'I spend a lot of time in Escondido too, so I might be near either home.' },
  ],

  // Photos in the carousel (files in src/assets/photos, listed in src/photos.js).
  gallery: ['studio', 'standing', 'beach', 'lying'],

  // Where map pins and chat messages go: a Formspree form URL, or your own relay later.
  // Empty means they open a text to the owner with the pin already filled in.
  relayEndpoint: '',

  ui: {
    // 'buttons': Call / Text / Share this spot
    // 'compact': Call, then Text and Share side by side
    // 'chat':    Call / Text / Message (a chat thread with a one-tap map pin)
    actions: 'buttons',
  },
};

export const PHOTO_ALT = {
  studio: 'River holding a palette knife in front of a paint-splattered canvas',
  standing: 'River standing in the yard: black coat, white chest, white speckled paws',
  beach: 'River lying in the sand by the ocean',
  lying: 'River lying on the floor with speckled white paws stretched out',
};
