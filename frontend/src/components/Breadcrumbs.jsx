import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Хлебные крошки"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: '#94a3b8',
        marginBottom: 20,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {isLast || !item.to ? (
              <span style={{ color: '#cbd5e1' }}>{item.label}</span>
            ) : (
              <Link
                to={item.to}
                style={{
                  color: '#93c5fd',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#bfdbfe'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#93c5fd'}
              >
                {item.label}
              </Link>
            )}

            {!isLast && <span style={{ color: '#475569' }}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}