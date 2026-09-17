import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getExhibits, deleteExhibit } from '../api/exhibits';

export default function ExhibitsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    getExhibits().then(data => {
      setItems(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id, title) => {
    if (!confirm(`Удалить "${title}"?`)) return;
    await deleteExhibit(id);
    load();
  };

  if (loading) return <Spinner />;

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 60, marginBottom: 16, opacity: 0.4 }}>🏛️</div>
        <h2 style={{ margin: '0 0 8px', fontSize: 24, color: '#f1f5f9' }}>
          Пока нет экспонатов
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Добавьте первый экспонат в вашу коллекцию
        </p>
        <Link to="/new" style={buttonPrimary}>
          + Добавить экспонат
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 26, color: '#f1f5f9' }}>
          Экспонаты
        </h2>
        <span style={{ color: '#94a3b8', fontSize: 14 }}>
          Всего: {items.length}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {items.map(item => (
          <ExhibitCard
            key={item.id}
            item={item}
            onDelete={() => onDelete(item.id, item.title)}
          />
        ))}
      </div>
    </div>
  );
}

/* ===== Карточка экспоната ===== */

function ExhibitCard({ item, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(15, 23, 42, 0.6)',
        border: `1px solid ${hovered ? 'rgba(96, 165, 250, 0.6)' : 'rgba(71, 85, 105, 0.5)'}`,
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 16px 40px rgba(0, 0, 0, 0.45)'
          : '0 4px 12px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Превью */}
      <Link
        to={`/exhibits/${item.id}`}
        style={{ display: 'block', position: 'relative' }}
      >
        <div
          style={{
            height: 180,
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            style={{
              display: item.imageUrl ? 'none' : 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              color: '#475569',
              width: '100%',
              height: '100%',
            }}
          >
            <span style={{ fontSize: 40 }}>🖼️</span>
            <span style={{ fontSize: 12, color: '#64748b' }}>Нет фото</span>
          </div>
        </div>

        {/* Метка "Нет фото" в углу */}
        {!item.imageUrl && (
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(0, 0, 0, 0.6)',
              color: '#cbd5e1',
              fontSize: 11,
              padding: '2px 8px',
              borderRadius: 4,
              backdropFilter: 'blur(4px)',
            }}
          >
            без фото
          </span>
        )}
      </Link>

      {/* Текст */}
      <div
        style={{
          padding: 16,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link
          to={`/exhibits/${item.id}`}
          style={{
            color: '#f1f5f9',
            textDecoration: 'none',
            fontSize: 17,
            fontWeight: 600,
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </Link>

        <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>
          {item.author || '—'} · {item.year}
        </div>

        {item.description && (
          <p
            style={{
              color: '#94a3b8',
              fontSize: 13,
              margin: '0 0 12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.4,
            }}
          >
            {item.description}
          </p>
        )}

        {/* Дата */}
        {item.createdAt && (
          <div
            style={{
              color: '#64748b',
              fontSize: 11,
              marginBottom: 12,
              marginTop: 'auto',
            }}
          >
            Добавлено: {new Date(item.createdAt).toLocaleDateString('ru-RU')}
          </div>
        )}

        {/* Кнопки */}
        <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
          <Link
            to={`/exhibits/${item.id}`}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '6px 10px',
              fontSize: 13,
              color: '#cbd5e1',
              border: '1px solid #4b5563',
              borderRadius: 5,
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Открыть
          </Link>
          <Link
            to={`/exhibits/${item.id}/edit`}
            style={{
              padding: '6px 10px',
              fontSize: 13,
              color: '#93c5fd',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              borderRadius: 5,
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            ✏️
          </Link>
          <button
            onClick={onDelete}
            style={{
              padding: '6px 10px',
              fontSize: 13,
              cursor: 'pointer',
              background: 'transparent',
              color: '#f87171',
              border: '1px solid #7f1d1d',
              borderRadius: 5,
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(248, 113, 113, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Вспомогательные ===== */

function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
      <div
        style={{
          width: 36,
          height: 36,
          border: '3px solid #334155',
          borderTopColor: '#60a5fa',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const buttonPrimary = {
  display: 'inline-block',
  padding: '10px 20px',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  background: '#3b82f6',
  color: '#fff',
  border: '1px solid #2563eb',
  borderRadius: 6,
  textDecoration: 'none',
  transition: 'background 0.15s ease',
};