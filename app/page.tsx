import Image from "next/image";

export default function Home() {

  return (
    <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '110vh',
        }}
      >
        <main
          className="w-full flex justify-center items-center px-4"
          style={{ backgroundColor: 'whitesmoke', minHeight: '90vh' }}
        >
       <div
            style={{
              width: '100%',
              maxWidth: '1500px',
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row', 
              animation: 'modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              border: "2px",
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                flex: 1,
                padding: '3rem',
                maxWidth: '550px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '600px',
                backgroundColor: 'whitesmoke',
                color: 'black',
              }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Sallon - Beleza com hora marcada
              </h2>
              <p style={{ marginBottom: '1.5rem' }}>
               
              </p>
               
            </div>
            <div
              style={{
                flex: 2,
                backgroundImage: 'url(/salao.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '600px',
                width: '100%',
              }}
            />
          </div>
        
    </main >
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
              
        
      </footer> <footer
          className="p-2 text-center md:block hidden"
          style={{ borderTop: "1px", padding: "20px"}}
        >
          <p className="text-xs font-normal" >
            Powered by Beatriz Fonseca | {new Date().getFullYear()}
          </p>
        </footer>
    </div >
  );
  }
