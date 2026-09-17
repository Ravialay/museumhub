import Breadcrumbs from '../components/Breadcrumbs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createExhibit, getExhibit, updateExhibit } from '../api/exhibits';

export default function ExhibitForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    author: '',
    year: new Date().getFullYear(),
    imageUrl: '',
  });

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    getExhibit(id).then(item => {
      if (item) {
        setForm({
          title: item.title ?? '',
          description: item.description ?? '',
          author: item.author ?? '',
          year: item.year ?? new Date().getFullYear(),
          imageUrl: item.imageUrl ?? '',
        });
      }
      setLoading(false);
    });
  }, [id, isEdit]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      ...form,
      year: Number(form.year),
    };

    try {
      if (isEdit) {
        await updateExhibit(id, payload);
        navigate(`/exhibits/${id}`);
      } else {
        const created = await createExhibit(payload);
        navigate(`/exhibits/${created.id}`);
      }
    } catch (err) {
      console.error(err);
      setError('Не удалось сохранить. Проверьте подключение к серверу.');
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div style={{ maxWidth: 560 }}>
      <Breadcrumbs
      items={
        isEdit
          ? [
              { label: 'Главная', to: '/' },
              { label: 'Экспонаты', to: '/' },
              { label: 'Редактирование' },
            ]
          : [
              { label: 'Главная', to: '/' },
              { label: 'Экспонаты', to: '/' },
              { label: 'Новый экспонат' },
            ]
      }
    />
      <h1 style={{ marginTop: 0, marginBottom: 20, fontSize: 26, color: '#f1f5f9' }}>
        {isEdit ? 'Редактировать экспонат' : 'Новый экспонат'}
      </h1>

      {error && (
        <div
          style={{
            padding: '10px 14px',
            marginBottom: 16,
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.4)',
            color: '#fca5a5',
            borderRadius: 6,
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={onSubmit}>
        {/* Название */}
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="title">Название</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={onChange}
            required
            disabled={saving}
            style={inputStyle}
          />
        </div>

        {/* Автор */}
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="author">Автор</label>
          <input
            id="author"
            name="author"
            type="text"
            value={form.author}
            onChange={onChange}
            disabled={saving}
            style={inputStyle}
          />
        </div>

        {/* Год */}
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="year">Год</label>
          <input
            id="year"
            name="year"
            type="number"
            value={form.year}
            onChange={onChange}
            disabled={saving}
            style={{ ...inputStyle, maxWidth: 120 }}
          />
        </div>

        {/* Описание */}
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={onChange}
            rows={5}
            disabled={saving}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* URL картинки */}
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="imageUrl">URL картинки</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            placeholder="например /images/starry-night.jpg"
            value={form.imageUrl}
            onChange={onChange}
            disabled={saving}
            style={inputStyle}
          />
        </div>

        {/* Кнопки */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              ...buttonPrimary,
              opacity: saving ? 0.7 : 1,
              cursor: saving ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {saving && <InlineSpinner />}
            {saving
              ? 'Сохранение...'
              : isEdit
                ? 'Сохранить изменения'
                : 'Создать экспонат'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
            style={{
              ...buttonSecondary,
              opacity: saving ? 0.7 : 1,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

/* ===== Стили ===== */

const inputStyle = {
  width: '100%',
  maxWidth: 500,
  padding: '10px 12px',
  fontSize: 15,
  background: '#0f172a',
  color: '#e5e7eb',
  border: '1px solid #374151',
  borderRadius: 6,
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.15s ease',
};

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontWeight: 600,
  fontSize: 14,
  textAlign: 'left',
  color: '#cbd5e1',
};

const fieldStyle = {
  marginBottom: 18,
};

const buttonPrimary = {
  padding: '10px 20px',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  background: '#3b82f6',
  color: '#fff',
  border: '1px solid #2563eb',
  borderRadius: 6,
  transition: 'background 0.15s ease',
};

const buttonSecondary = {
  padding: '10px 20px',
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
  background: 'transparent',
  color: '#cbd5e1',
  border: '1px solid #4b5563',
  borderRadius: 6,
  transition: 'background 0.15s ease',
};

/* ===== Вспомогательные компоненты ===== */

function InlineSpinner() {
  return (
    <>
      <span
        style={{
          display: 'inline-block',
          width: 14,
          height: 14,
          border: '2px solid rgba(255,255,255,0.4)',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
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