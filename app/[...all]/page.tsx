import dynamic from 'next/dynamic';

const App = dynamic(() => import('components/router/app-router'), {
  ssr: false,
});

export async function generateStaticParams() {
  return [
    // authenticate
    { all: ['register'] },
    { all: ['home'] },
    { all: ['swap'] },
    { all: ['contacts'] },
    { all: ['activity'] },
    { all: ['settings'] },
    // unauthenticate
    { all: ['login'] },
    { all: ['create'] },
  ];
}

export default function Page() {
  return <App />;
}
