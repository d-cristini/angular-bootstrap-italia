<p align="center">
  <h1 align="center">Bootstrap Italia + Angular 9</h1>

  <p align="center">
    Angular base library to wrap Bootstrap Italia HTML, CSS and JS as Angular dynamic components
  </p>
</p>

## Features

* [Bootstrap Italia 1.3.10](https://italia.github.io/bootstrap-italia/docs/come-iniziare/introduzione)
* Angular 9.1.5

## Quick start

**Warning: we strongly recommend node >=v6.9.0 and npm >=3.0.0**

`npm i angular-bootstrap-italia` - Installs project modules

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Kit Bootstrap Italia / Angular Material
import { AngularBootstrapItaliaModule } from 'angular-bootstrap-italia';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularBootstrapItaliaModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Once your library is imported, you can use its components, directives and pipes in your Angular application.

## Creators

**Dario Cristini**

## Copyright and license

Code and documentation copyright 2020 the authors.

Code released under the [MIT License].
