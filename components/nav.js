import html from "html-literal";

import navItem from "./navItem.js";

export default navItems => {
  return html`
    <nav>
      <i class="fa-solid fa-bars"></i>
      <ul class="hidden--mobile nav-links">
        ${navItems.map(item => navItem(item)).join("")}
      </ul>
    </nav>
  `;
};
