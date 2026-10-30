// Tints the phone's browser bar and the overscroll area to match the page.
export function setThemeColor(color) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
  document.documentElement.style.background = color;
}
