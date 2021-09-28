import { ReactComponent as BarsIcon } from "@fortawesome/fontawesome-free/svgs/solid/bars.svg";
import { css } from "@linaria/core";
import type {
  ComponentChild,
  ComponentChildren,
  FunctionComponent,
} from "preact";

import { Center } from "./layouts/Center";
import { Cluster } from "./layouts/Cluster";
import { Icon } from "./layouts/Icon";
import { Stack } from "./layouts/Stack";

const styleHeader = css`
  padding: var(--s-1);
  & > h1 {
    font-size: 1.5rem;
    margin: 0;
    text-decoration: underline;
  }
`;

export type Props = {
  children: ComponentChildren;
  pageTitle: ComponentChild;
};

export const TemplateApp: FunctionComponent<Props> = ({
  children,
  pageTitle,
}) => {
  return (
    <Center>
      <Stack as="article">
        <Cluster as="header" className={styleHeader} justify="space-between">
          <h1>{pageTitle}</h1>
          <a className="align-self:center" href="#menu">
            <Icon icon={BarsIcon} height="2rem" />
            <span className="visually-hidden">Navigační menu</span>
          </a>
        </Cluster>
        <main>{children}</main>
      </Stack>
    </Center>
  );
};
