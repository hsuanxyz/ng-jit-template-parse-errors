# NgJitTemplateParseErrors

Live DEMO https://ng-jit-template-parse-errors.now.sh/

# 🐞 bug report

### Affected Package

`@angular/compiler`

### Is this a regression?

No sure, But got the same problem on `v9-rc.4` and `v8.2`

### Description

#### Background

I am using Angular to rewrite the front end of [apache/zeppelin](https://github.com/apache/zeppelin/tree/web_angular), it allows users to enter dynamic templates and run, so I trying to implement this feature using the JIT compiler but blocked by this problem.

#### Steps to reproduce

Open the live DEMO  https://ng-jit-template-parse-errors.now.sh/ and browser's console.

Enter the following code in the textarea.

```html
<button (click)="i = i++">Click {{i}}</button>
```

Click the render button and we will see the following errors in the console, this is good because this error is expected.

```
vendor-es2015.js:40954 ERROR Error: Template parse errors:
Parser Error: Unexpected end of expression: i = i++ at the end of the expression [i = i++] in ng:////template.html@0:17 ("<button (click)="[ERROR ->]i = i++">Click {{i}}</button>"): ng:////template.html@0:17
```

Then enter the correct template into the textarea and click the render button again.

```html
<button (click)="i = i + 1">Click {{i}}</button>
```

Expect no error, but still got the same error.

```
vendor-es2015.js:40954 ERROR Error: Template parse errors:
Parser Error: Unexpected end of expression: i = i++ at the end of the expression [i = i++] in ng:////template.html@0:17 ("<button (click)="[ERROR ->]i = i++">Click {{i}}</button>"): ng:////template.html@0:17
```

I guess the error was cached, so I called the method `compiler.clearCache()`, but it still didn't work.

I tried using the `ɵrenderComponent` method to render the dynamic component, the error is disappeared, but I can not use other modules (like `FormsModule`) feature in this component.

## 🔬 Minimal Reproduction

Repo: https://github.com/hsuanxyz/ng-jit-template-parse-errors/
Live DEMO: https://ng-jit-template-parse-errors.now.sh/

## 🔥 Exception or Error

```
vendor-es2015.js:40954 ERROR Error: Template parse errors:
Parser Error: Unexpected end of expression: i = i++ at the end of the expression [i = i++] in ng:////template.html@2:17 ("<input [(ngModel)]="name"> <span>{{name}}</span>
<br>
<button (click)="[ERROR ->]i = i++">Click {{i}}</button>"): ng:////template.html@2:17
Parser Error: Unexpected end of expression: i = i++ at the end of the expression [i = i++] in ng:////template.html@2:17 ("<input [(ngModel)]="name"> <span>{{name}}</span>
<br>
<button (click)="i = i++">[ERROR ->]Click {{i}}</button>"): ng:////template.html@2:26
    at syntaxError (vendor-es2015.js:10006)
    at htmlAstToRender3Ast (vendor-es2015.js:22123)
    at parseTemplate (vendor-es2015.js:24817)
    at CompilerFacadeImpl.compileComponent (vendor-es2015.js:25661)
    at Function.get (vendor-es2015.js:70705)
    at getComponentDef (vendor-es2015.js:37333)
    at assertComponentType (vendor-es2015.js:37743)
    at ComponentFactoryResolver$1.resolveComponentFactory (vendor-es2015.js:65766)
    at AppComponent.renderDynamicComponent (main-es2015.js:66)
    at AppComponent_Template_button_click_2_listener (main-es2015.js:83)
```


## 🌍  Your Environment

**Angular Version:**

```bash
Angular CLI: 9.0.0-rc.6
Node: 12.11.1
OS: darwin x64

Angular: 9.0.0-rc.6
... animations, cli, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router
Ivy Workspace: Yes

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.900.0-rc.6
@angular-devkit/build-angular     0.900.0-rc.6
@angular-devkit/build-optimizer   0.900.0-rc.6
@angular-devkit/build-webpack     0.900.0-rc.6
@angular-devkit/core              9.0.0-rc.6
@angular-devkit/schematics        9.0.0-rc.6
@ngtools/webpack                  9.0.0-rc.6
@schematics/angular               9.0.0-rc.6
@schematics/update                0.900.0-rc.6
rxjs                              6.5.3
typescript                        3.6.4
webpack                           4.41.2
```

**Anything else relevant?**
<!-- ✍️Is this a browser specific issue? If so, please specify the browser and version. -->

<!-- ✍️Do any of these matter: operating system, IDE, package manager, HTTP server, ...? If so, please mention it below. -->
