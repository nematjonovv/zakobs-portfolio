import '../styles/Custom.scss'
function Header3({ header3, width }) {
  return (
    <h3
      className={`text-4xl font-bold text-[#25202F] mt-4 utils-header`}
      style={{ width: `${width}px` }}
    >
      {header3}
    </h3>
  );
}

export default Header3;
