export function GenderIcons({ genderRate }) {
  if (genderRate === -1) {
    return <span className="text-gray-500">Unknown</span>;
  }

  if (genderRate === 0) {
    return <i className="fa-solid fa-mars text-blue-500"></i>; // Male only
  }

  if (genderRate === 8) {
    return <i className="fa-solid fa-venus text-pink-500"></i>; // Female only
  }

  return (
    <span>
      <i className="fa-solid fa-mars text-blue-500 mr-1"></i>
      <i className="fa-solid fa-venus text-pink-500"></i>
    </span>
  );
}