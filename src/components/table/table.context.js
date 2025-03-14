import { createContext } from '@lit/context';

export const tableContext = createContext( Symbol( 'table' ) );

export const tableRowContext = createContext( Symbol( 'table-row' ) );
