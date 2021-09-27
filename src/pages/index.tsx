type Props = {
  foo?: string;
};

export const Index = ({ foo = `bar` }: Props) => {
  return <>Zde bude homepage {foo} <a href="/prihlaseni">Přihlásit se</a></>;
};
