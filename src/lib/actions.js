// Svelte action: reports true once the element has scrolled off the top of the screen.
// Used to slide in the sticky call/text dock when the main buttons are out of view.
export function scrolledPast(node, onChange) {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(([entry]) =>
    onChange(!entry.isIntersecting && entry.boundingClientRect.top < 0),
  );
  observer.observe(node);
  return { destroy: () => observer.disconnect() };
}
