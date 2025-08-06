'use client';
import ScrollLink from "@/components/scroolLink";

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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "whitesmoke",
            color: "black",
            height: "100%",
            gap: "1rem",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 700, textAlign: "center" }}>
            Sallon - Beleza com hora marcada
          </h2>
          <ScrollLink
            to="login"
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Agende já
          </ScrollLink>
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

      <div
        id="login"
        style={{
          padding: "40px 20px",
          textAlign: "center",
          backgroundColor: "black",
          width: "100%",
          color: "white",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Login</h3>
        <form style={{ maxWidth: "300px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            style={{ padding: "10px", borderRadius: "4px", border: "none" }}
          />
          <input
            type="password"
            placeholder="Senha"
            style={{ padding: "10px", borderRadius: "4px", border: "none" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "white",
              color: "black",
              fontWeight: 600,
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
        </form>
      </div>

      <footer
        className="p-2 text-center md:block hidden"
        style={{ borderTop: "1px", padding: "20px", backgroundColor: "black", color: "white" }}
      >
        <p className="text-xs font-normal">
          Powered by Beatriz Fonseca | {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
