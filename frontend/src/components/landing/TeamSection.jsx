import Title from "./Title";
import TeamCard from "./TeamCard";
import Image1 from "../../assets/img/team-gliga.jpg";
import Image2 from "../../assets/img/team-mavriche.jpeg";
import Image3 from "../../assets/img/team-andreea.jpeg";

export default function TeamSection() {
  return (
    <section className="pt-20 pb-48">
      <div className="container max-w-7xl mx-auto px-4">
        <Title heading="Here are our heroes">Our Amazing team</Title>
        <div className="flex flex-wrap justify-center">
          <TeamCard
            img={Image1}
            name="Gliga Dumitru"
            position="Web Developer"
          />
          <TeamCard
            img={Image2}
            name="Mavriche Raluca"
            position="PO & Scrum Master"
          />
          <TeamCard img={Image3} name="Vatamanelu Andreea" position="Tester" />
        </div>
      </div>
    </section>
  );
}
