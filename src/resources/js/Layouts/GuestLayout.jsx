
import { Head } from '@inertiajs/react'

export default function Guest({ title, children }) {
  return (
    <>
      <Head title={title} />
      <main className="guest-layout">
        {children}
      </main>
    </>
  );
}
