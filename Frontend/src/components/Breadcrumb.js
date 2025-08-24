import { Link, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const navigate = useNavigate();
  const sharedStyle = {
    color: '#1f2937',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: 16,
    lineHeight: '24px',
    display: 'inline-block',
    background: 'none',
    border: 'none',
    padding: 0,
  };

  return (
    <nav
      style={{
        position: 'absolute',
        top: 80,
        left: 80,
        display: 'flex',
        gap: '20px', // use gap for spacing
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <Link
        to="/"
        style={{
          ...sharedStyle,
          marginTop: 16
          
        }}
      >
        Home
      </Link>
      <button
        onClick={() => navigate(-1)}
        style={{
          ...sharedStyle,
        }}
      >
        Back
      </button>
    </nav>
  );
};

export default Breadcrumb;
