import type { PreloadedState } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'

import { Provider } from 'react-redux'
import { AppStore, DEFAULT_STATE, reducer, RootState } from './app/store'
import { loadEpisodesAsync } from './features/episodes/episodesSlice'
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(  ui: React.ReactElement,  {
    preloadedState = DEFAULT_STATE,
    store = configureStore({ reducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    store.dispatch(loadEpisodesAsync())
    return <Provider store={store}>{children}</Provider>
  }  
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}