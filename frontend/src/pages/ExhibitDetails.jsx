import Breadcrumbs from '../components/Breadcrumbs';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getExhibit, deleteExhibit } from '../api/exhibits';


export default function ExhibitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getExhibit(id)
      .then(data => {
        if (!data) {
          setError('Экспонат не найден');
        } else {
          setItem(data);
        }
      })
      .catch(() => setError('Не удалось загрузить данные'))
      .finally(() => setLoading(false));
  }, [id]);

  const onDelete = async () => {
    if (!confirm(`Удалить "${item.title}"?`)) return;
    await deleteExhibit(id);
    navigate('/');
  };

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: '#f87171' }}>{error}</p>;
  if (!item) return null;

  return (
    <div>
      <Breadcrumbs
      items={[
        { label: 'Главная', to: '/' },
        { label: 'Экспонаты', to: '/' },
        { label: item.title },
      ]}
    />
      {/* ===== Заголовок и кнопки ===== */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <h1
            style={{
              margin: '0 0 8px',
              fontSize: 32,
              lineHeight: 1.2,
              color: '#f1f5f9',
            }}
          >
            {item.title}
          </h1>
          <div style={{ color: '#94a3b8', fontSize: 15 }}>
            {item.author} · {item.year}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link to="/" style={buttonSecondary}>
            ← Назад
          </Link>
          <Link to={`/exhibits/${id}/edit`} style={buttonSecondary}>
            ✏️ Редактировать
          </Link>
          <button onClick={onDelete} style={buttonDanger}>
            🗑️ Удалить
          </button>
        </div>
      </div>

      {/* ===== Две колонки: картинка и описание ===== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 32,
          alignItems: 'start',
        }}
      >
        {/* Картинка */}
        <div>
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                width: '100%',
                maxWidth: 500,
                display: 'block',
                borderRadius: 12,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(71, 85, 105, 0.5)',
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
              width: '100%',
              maxWidth: 500,
              aspectRatio: '4 / 3',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px dashed #475569',
              borderRadius: 12,
              color: '#64748b',
              fontSize: 60,
            }}
          >
            🖼️
          </div>
        </div>

        {/* Описание */}
        <div>
          <h2
            style={{
              margin: '0 0 12px',
              fontSize: 18,
              color: '#cbd5e1',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Описание
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.7,
              color: '#e5e7eb',
              whiteSpace: 'pre-wrap',
            }}
          >
            {item.description || 'Описание отсутствует.'}
          </p>

          {/* Метаданные блоками */}
          <div style={{ marginTop: 32, display: 'grid', gap: 12 }}>
            <MetaRow label="Автор" value={item.author} />
            <MetaRow label="Год создания" value={item.year} />
            <MetaRow
              label="Добавлено"
              value={item.createdAt ? new Date(item.createdAt).toLocaleDateString('ru-RU') : '—'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Вспомогательные компоненты ===== */

function MetaRow({ label, value }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
        paddingBottom: 8,
        fontSize: 15,
      }}
    >
      <span style={{ color: '#94a3b8' }}>{label}</span>
      <span style={{ color: '#e5e7eb', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

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

/* ===== Стили кнопок ===== */

const buttonBase = {
  display: 'inline-block',
  padding: '8px 16px',
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 6,
  textDecoration: 'none',
  cursor: 'pointer',
  border: '1px solid transparent',
  transition: 'background 0.15s ease, border-color 0.15s ease',
};

const buttonSecondary = {
  ...buttonBase,
  color: '#cbd5e1',
  background: 'transparent',
  border: '1px solid #4b5563',
};

const buttonDanger = {
  ...buttonBase,
  color: '#f87171',
  background: 'transparent',
  border: '1px solid #7f1d1d',
};