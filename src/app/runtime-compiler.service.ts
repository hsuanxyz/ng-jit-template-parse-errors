import {
  Compiler,
  Component,
  Injectable,
  NgModule,
  NgModuleFactory,
  Type
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export class DynamicTemplate {
  constructor(
    public readonly template: string,
    // tslint:disable-next-line:no-any
    public readonly component: Type<any>,
    // tslint:disable-next-line:no-any
    public readonly moduleFactory?: NgModuleFactory<any>
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class RuntimeCompilerService {

  public async createAndCompileTemplate(template: string): Promise<DynamicTemplate> {
    this.compiler.clearCache();
    const DynamicComponent = Component({ template })(
      class {
        i = 0;
      }
    );
    const DynamicModule = NgModule({
      declarations   : [ DynamicComponent ],
      exports        : [ DynamicComponent ],
      entryComponents: [ DynamicComponent ],
      imports        : [ FormsModule ]
    })(class {});

    try {
      const compiledModule = await this.compiler.compileModuleAndAllComponentsAsync(DynamicModule);
      return new DynamicTemplate(template, DynamicComponent, compiledModule.ngModuleFactory);
    } catch (e) {
      throw e;
    }
  }

  constructor(private compiler: Compiler) {
  }
}

