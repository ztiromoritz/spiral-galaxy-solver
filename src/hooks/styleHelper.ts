export function useStyleHelper() {
  const gridPosition = ([x, y]) => {
    return {
      gridColumn: `${Math.floor(x + 1)}${
        Number.isInteger(x) ? '' : '/ span 2'
      }`,
      gridRow: `${Math.floor(y + 1)}${Number.isInteger(y) ? '' : '/ span 2'}`,
    };
  };

  const colors: string[] = [];
  let n = 44;
  while (n--) {
    colors.push(
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  }
  const backgroundStyle = ({ color }) => {
    if (color < 0) return '#444';
    return `#${colors[color]}`;
    //return `linear-gradient(33deg, #${colors[i]} 0%, #${colors[(i+10)%43]} 100%)`
  };

  const borderStyle = (cell) => {
    return {
      borderTop: cell.borders[0] ? 'solid #eeffee 2px' : 'none',
      borderRight: cell.borders[1] ? 'solid #eeffee 2px' : 'none',
      borderBottom: cell.borders[2] ? 'solid #eeffee 2px' : 'none',
      borderLeft: cell.borders[3] ? 'solid #eeffee 2px' : 'none',
    };
  };

  return { gridPosition, backgroundStyle, borderStyle };
}
