interface IArrowIconProps {
  isExpanded?: boolean;
}

const ArrowIcon = ({ isExpanded }: IArrowIconProps) => {
  return (
    <svg
      role="graphics-symbol"
      viewBox="0 0 100 100"
      className={`arrow-icon ${isExpanded ? 'arrow-expanded' : ''}`}
    >
      <polygon points="5.9,88.2 50,11.8 94.1,88.2 " fill="#676566" />
    </svg>
  );
}

export default ArrowIcon;