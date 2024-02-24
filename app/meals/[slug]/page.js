export default function BlogSlug({ params }) {
  return (
    <>
      <p>This is a dynamic page</p>
      <p>{params.slug}</p>
    </>
  );
}
