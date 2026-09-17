import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children, maxWidth = 1100 }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/exhibits') return location.pathname === '/exhibits';
    return location.pathname.startsWith(path);
  };

  const footerLinkStyle = {
  color: '#94a3b8',
  textDecoration: 'none',
  fontSize: 13,
  transition: 'color 0.15s ease',
  };

  const linkStyle = (path) => ({
    color: isActive(path) ? '#fff' : '#9ca3af',
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    background: isActive(path) ? 'rgba(255,255,255,0.08)' : 'transparent',
    fontWeight: isActive(path) ? 600 : 400,
    fontSize: 15,
    transition: 'all 0.15s ease',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
        backgroundImage: `
          radial-gradient(rgba(148, 163, 184, 0.07) 1px, transparent 1px),
          linear-gradient(180deg, #0f172a 0%, #111827 100%)
        `,
        backgroundSize: '24px 24px, 100% 100%',
        backgroundRepeat: 'repeat, no-repeat',
        backgroundAttachment: 'fixed, fixed',
      }}
    >
      <header
        style={{
          background: 'rgba(17, 24, 39, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(55, 65, 81, 0.6)',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
          }}
        >
          <Link
            to="/"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            🏛️ MuseumHub
          </Link>

          <nav style={{ display: 'flex', gap: 6 }}>
            <Link to="/" style={linkStyle('/')}>
              Главная
            </Link>
            <Link to="/exhibits" style={linkStyle('/exhibits')}>
              Экспонаты
            </Link>
            <Link to="/exhibits/new" style={linkStyle('/exhibits/new')}>
              + Добавить
            </Link>
          </nav>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth,
          margin: '0 auto',
          padding: '20px 20px 40px',
        }}
      >
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.55)',
            border: '1px solid rgba(71, 85, 105, 0.4)',
            borderRadius: 14,
            padding: '28px 32px',
            boxShadow:
              '0 10px 30px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.03) inset',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          {children}
        </div>
      </main>

      <footer
  style={{
    borderTop: '1px solid rgba(55, 65, 81, 0.5)',
    padding: '40px 24px 20px',
    marginTop: 40,
    color: '#94a3b8',
    fontSize: 14,
  }}
>
  <div
    style={{
      maxWidth: 1400,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 32,
      marginBottom: 32,
    }}
  >
    {/* Колонка 1: логотип и описание */}
    <div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#f1f5f9',
          marginBottom: 8,
        }}
      >
        🏛️ MuseumHub
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#94a3b8' }}>
        Каталог музейных экспонатов. Учебный проект на .NET + React.
      </p>
    </div>

    {/* Колонка 2: навигация */}
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#cbd5e1',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 12,
        }}
      >
        Навигация
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <li>
          <Link to="/" style={footerLinkStyle}>
            Главная
          </Link>
        </li>
        <li>
          <Link to="/exhibits" style={footerLinkStyle}>
            Экспонаты
          </Link>
        </li>
        <li>
          <Link to="/exhibits/new" style={footerLinkStyle}>
            Добавить экспонат
          </Link>
        </li>
      </ul>
    </div>

    {/* Колонка 3: контакты */}
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#cbd5e1',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 12,
        }}
      >
        Контакты
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <li>
          <a href="mailto:Barista3311@yandex.ru" style={footerLinkStyle}>
            ✉️ Barista3311@yandex.ru
          </a>
        </li>
        <li>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={footerLinkStyle}
          >
            🐙 GitHub
          </a>
        </li>
      </ul>
    </div>
  </div>

  {/* Копирайт снизу */}
  <div
    style={{
      maxWidth: 1400,
      margin: '0 auto',
      paddingTop: 20,
      borderTop: '1px solid rgba(55, 65, 81, 0.4)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12,
      fontSize: 13,
      color: '#64748b',
    }}
  >
    <span>© {new Date().getFullYear()} MuseumHub. Учебный проект.</span>
    <span>Сделано с ❤️ на .NET и React</span>
  </div>
</footer>
</div>
  );
}