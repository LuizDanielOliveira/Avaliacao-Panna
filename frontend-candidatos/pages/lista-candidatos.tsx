import CandidatoList from '@/components/CandidatoList';

export default function ListaCandidatosPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Lista de Candidatos</h1>
      <CandidatoList />
    </main>
  );
}
