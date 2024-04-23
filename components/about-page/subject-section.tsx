import SubjCard from "../cards/subj-card";

export default function SubjectSection() {
  return (
    <>
      {/* ABOUT US */}
      <h2 className="pb-2 text-4xl md:text-6xl font-medium tracking-tight scroll-m-20 first:mt-0 drop-shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] mb-8 text-center">
        Informazioni su di noi
      </h2>
      {/* SUBJECTS*/}
      <div className="mb-32 space-y-10">
        <SubjCard
          title="Informatica"
          src="https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          par="              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
    provident? Rerum consequuntur beatae veritatis tenetur,
    doloremque, fuga iure quo incidunt dolor perferendis quos
    exercitationem est reprehenderit enim labore, eveniet animi. Ipsam
    ad quia ipsum ab impedit velit rerum debitis, reprehenderit,
    eveniet corporis officiis, vitae fugit quos laborum ut officia
    obcaecati sapiente commodi possimus eligendi modi et voluptate!
    Deserunt, fugit voluptatem?"
        />
        <SubjCard
          title="Elettronica e Robotica"
          src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          par="              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
    provident? Rerum consequuntur beatae veritatis tenetur,
    doloremque, fuga iure quo incidunt dolor perferendis quos
    exercitationem est reprehenderit enim labore, eveniet animi. Ipsam
    ad quia ipsum ab impedit velit rerum debitis, reprehenderit,
    eveniet corporis officiis, vitae fugit quos laborum ut officia
    obcaecati sapiente commodi possimus eligendi modi et voluptate!
    Deserunt, fugit voluptatem?"
        />
        <SubjCard
          title="Scientifico"
          src="https://images.unsplash.com/photo-1564325724739-bae0bd08762c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          par="              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
    provident? Rerum consequuntur beatae veritatis tenetur,
    doloremque, fuga iure quo incidunt dolor perferendis quos
    exercitationem est reprehenderit enim labore, eveniet animi. Ipsam
    ad quia ipsum ab impedit velit rerum debitis, reprehenderit,
    eveniet corporis officiis, vitae fugit quos laborum ut officia
    obcaecati sapiente commodi possimus eligendi modi et voluptate!
    Deserunt, fugit voluptatem?"
        />
      </div>
    </>
  );
}
