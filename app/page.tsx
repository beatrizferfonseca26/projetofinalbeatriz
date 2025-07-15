import Image from "next/image";

export default function Home() {
  return (
    <div>
    <main
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "whitesmoke",
          color: "black",
          height: "100%",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center" }}>
          Sallon - Beleza com hora marcada
        </h2>
      </div>
      <div
        style={{
          flex: 1,
          height: "100%",
          backgroundImage: "url(/salao.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </main>
    <div style={{ padding: "20px", textAlign: "center", backgroundColor: "black", width: "100%", height: "1000px" }}>

    </div>
    <footer
          className="p-2 text-center md:block hidden"
          style={{ borderTop: "1px", padding: "20px"}}
        >
          <p className="text-xs font-normal" >
            Powered by Beatriz Fonseca | {new Date().getFullYear()}
          </p>
        </footer>
    </div>
  );
}
