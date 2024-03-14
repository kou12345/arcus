export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <div>{params.id}</div>
    </div>
  );
}
