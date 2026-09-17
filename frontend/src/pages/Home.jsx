import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 72, marginBottom: 12 }}>🏛️</div>
      <h1
        style={{
          margin: '0 0 12px',
          fontSize: 36,
          color: '#f1f5f9',
          letterSpacing: 0.5,
        }}
      >
        MuseumHub
      </h1>
      <p
        style={{
          color: '#94a3b8',
          fontSize: 17,
          maxWidth: 500,
          margin: '0 auto 32px',
          lineHeight: 1.6,
        }}
      >
        Ваш личный каталог музейных экспонатов. Добавляйте,
        редактируйте и просматривайте коллекцию в удобном виде.
      </p>

      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/exhibits" style={buttonPrimary}>
          Смотреть экспонаты
        </Link>
        <Link to="/exhibits/new" style={buttonSecondary}>
          + Добавить экспонат
        </Link>
      </div>

      {/* Плитки с идеями/фичами */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          maxWidth: 700,
          margin: '48px auto 0',
        }}
      >
        <Feature icon="📚" title="Каталог" text="Все экспонаты в одном месте" />
        <Feature icon="🔍" title="Просмотр" text="Детали, картинки, описания" />
        <Feature icon="✏️" title="Редактирование" text="Правьте данные в один клик" />
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div
      style={{
        padding: 16,
        background: 'rgba(15, 23, 42, 0.5)',
        border: '1px solid rgba(71, 85, 105, 0.4)',
        borderRadius: 10,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: '#f1f5f9',
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13, color: '#94a3b8' }}>{text}</div>
    </div>
  );
}

const buttonBase = {
  display: 'inline-block',
  padding: '10px 22px',
  fontSize: 15,
  fontWeight: 600,
  borderRadius: 6,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'background 0.15s ease',
};

const buttonPrimary = {
  ...buttonBase,
  background: '#3b82f6',
  color: '#fff',
  border: '1px solid #2563eb',
};

const buttonSecondary = {
  ...buttonBase,
  background: 'transparent',
  color: '#cbd5e1',
  border: '1px solid #4b5563',
};