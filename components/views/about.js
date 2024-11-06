import html from "html-literal";
import DSC03006 from "../../assets/img/DSC03006.jpg";

export default () => html`
  <section id="bio">
    <div class="aboutPic">
      <img src="${DSC03006}" alt="Picture of me" width="400px" />
    </div>
    <div class="aboutBody">
      <h3 id="subHeading">A little about me:</h3>
      <p>
        Hello, I'm Ethan Krieg, a former Recruiter based in St. Louis, Missouri.
        During my time as a Technical Recruiter, I specialized in staffing
        Engineers for major companies including Boeing, General Dynamics,
        Raytheon, and Lockheed Martin. This experience ignited my passion for
        the tech industry, particularly in software development. Now, I am
        focused on transitioning my skills and expertise into a career in Full
        Stack Web development, leveraging my understanding of the industry and
        my recruitment background to excel in this field.
      </p>
      <h4>What I like to do for fun</h4>
      <ul>
        <li>Travel to places that I haven't been before</li>
        <li>Play videos games</li>
        <li>Watch sports</li>
        <li>Cooking</li>
      </ul>
      <h4>What I want out of tech</h4>
      <ul>
        <li>
          I want to build applications and develop features that provide value
        </li>
        <li>
          I want the flexibility to work either in-office or remotely from home
        </li>
        <li>
          I want to develop a skill set that can provide a healthy living for my
          future family
        </li>
      </ul>
    </div>
  </section>
`;
