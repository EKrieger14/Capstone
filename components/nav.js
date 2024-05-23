import html from "html-literal";

import navItem from "./navItem.js";

// export default () => html`
//   <nav>
//     <i class="fa-solid fa-bars"></i>
//     <ul class="hidden--mobile nav-links">
//       <li>Dashboard</li>
//       <li><a href="about.html">About me</a></li>
//       <li><a href="contact.html">Contact</a></li>
//     </ul>
//   </nav>
// `;

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
