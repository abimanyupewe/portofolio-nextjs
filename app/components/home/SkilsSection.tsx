import React from "react";
import Title from "./props/Title";
import MySkil from "./myskil/MySkil";

const SkilsSection = () => {
  const frameworks = [
    { name: "Figma", percentage: 90 },
    { name: "Tailwind CSS", percentage: 85 },
    { name: "React", percentage: 50 },
    { name: "Flutter", percentage: 65 },
  ];

  const languages = [
    { name: "JavaScript", percentage: 65 },
    { name: "Dart", percentage: 70 },
  ];

  return (
    <section id="sklis" className="py-20 lg:py-40 px-20">
      <div className="flex justify-center items-center">
        <Title text1={"MY"} text2={"SKILS"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <MySkil title="Frameworks & Tools" skills={frameworks} />
        <MySkil title="Programming Languages" skills={languages} />
      </div>
    </section>
  );
};

export default SkilsSection;
