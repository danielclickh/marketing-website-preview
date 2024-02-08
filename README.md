## Getting Started

### Configure environment

- install `node v18`.

```bash
brew install nvm
nvm install 18
```

### Install yarn dependencies

You need to install `yarn` packages for every project separately.
Navigate to a project folder and run `yarn`.

### Copy Environment variables (local)

We have already added dummy values for the necessary operations but if you need to modify or test some functionalities use the following steps

1. Rename the `.env.example` to `.env`
2. Ask for the credentials for the project in the [#website](https://clickhouse-inc.slack.com/archives/C02FCQ30GKA) Slack channel.
    >`STRAPI_API_URL` can be replaced with the local running strapi if you prefer to work in offline mode

### Copy Environment variables (vercel)
1. Go to your vercel Project that hosts this repo
2. Go to Settings
3. Click on Environment Variables
4. Click on create new tab
5. Add the env variables and select the list of env you want the environment to be applied
6. click Save

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

You can start editing the page by modifying the values inside `pages` directory. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Marketo Forms

Marketo forms don't play nice with React, especially when using the NextJS router or if there are multiple instances on a single page. To address this, we have a `/marketo-forms/[id]` route, which is then embedded as an iframe. This allows for multiple instances and the use of the NextJS router. However, there are some considerations when using the [Marketo JS API](https://developers.marketo.com/javascript-api/forms/api-reference/), which we'll discuss in more detail below.

### Basic Component Usage

```tsx
import MarketoForm from './components/MarketoForm';

export default function Page() {
    return (
        <MarketoForm formId={'1234'} />
    );
}
```

Example rendered result:

```html
<iframe src="/marketo-forms/1234"></iframe>
```

### Property: `disclaimer`

Custom disclaimer markdown can be passed to the component using the `disclaimer` property. For example:

```tsx
<MarketoForm
    formId={'1234'}
    disclaimer='By submitting this form, blah blah [Privacy Policy Link](/legal/privacy-policy)'
/>
```

Alternatively, you can disable the disclaimer altogether by passing `false` to the property:

```tsx
<MarketoForm
    formId={'1234'}
    disclaimer={false}
/>
```

### Property: `onLoad`

The `onLoad` property accepts a callback function that will be called once the iframe has mounted, loaded, and the `MktoForms2.loadForm()` method has successfully completed. This is useful for displaying a loading indicator, for example:

```tsx
export default function Page() {
    const [formLoaded, setFormLoaded] = useState(false);

    return (
        <>
            <MarketoForm
                formId={'1234'}
                onLoad={() => {
                    setFormLoaded(true);
                }}
            />
            {!formLoaded && <span>Loading...</span>}
        </>
    );
}
```

### Property: `onSuccess`

The `onSuccess` property accepts a callback that is called when the form has successfully been submitted. This can be useful for displaying a success message or redirecting the user, for example:

```tsx
export default function Page() {
    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

    return (
        <>
            <MarketoForm
                formId={'1234'}
                onSuccess={(formValues, redirectUrl) => {
                    setSubmittedSuccessfully(true);

                    // Optional: Redirect user if it has been configured in Marketo
                    if (redirectUrl) window.location = redirectUrl;
                }}
            />
            {submittedSuccessfully && <span>Thank you for your submission!</span>}
        </>
    );
}
```

> Note: Success redirects are disabled by default and will need manual implementation if required.

### Marketo JS API

If you need to use the [MktoForms2 **Form Methods**](https://developers.marketo.com/javascript-api/forms/api-reference/), you can do so via the `onLoad` callback. However, there are some methods with slight differences compared to the official documentation due to the two-way communication needed between the component and iframe. See the full list of varying methods further down.

**Basic Example:**

```tsx
export default function Page() {
    return (
        <MarketoForm
            formId={'1234'}
            onLoad={(formObject) => {
                // Set field values
                formObject.setValues({ name: 'Bob Ross' });

                // Trigger validation
                formObject.validate();

                // Add hidden fields
                formObject.addHiddenFields({ key: 'Value', key2: 'Example' });
            }}
        />
    );
}
```

#### Varying Methods

Below is a list of Marketo JS API methods that have different implementations than the official docs.

##### `.validate()`

This method will return a `Promise<boolean)`, so if you need to use the return value for something, you'll need to use the `await` operator. For example:

```tsx
export default function Page() {
    return (
        <MarketoForm
            formId={'1234'}
            onLoad={(formObject) => {
                // Trigger: doesn't need await
                formObject.validate();

                // Getter: needs async/await
                (async () => {
                    const formIsValid = await formObject.validate();
                })();
            }}
        />
    );
}
```

##### `.getValues()`

This method will return a `Promise<Record<string, any>>`, so if you need to use the return value for something, you'll need to use the `await` operator. For example:

```tsx
export default function Page() {
    return (
        <MarketoForm
            formId={'1234'}
            onLoad={(formObject) => {
                (async () => {
                    const formValues = await formObject.getValues();
                })();
            }}
        />
    );
}
```

##### `.submittable()` (alias: `.submitable()`)

This method will return a `Promise<boolean>`, so if you need to use the return value for something, you'll need to use the `await` operator. For example:

```tsx
export default function Page() {
    return (
        <MarketoForm
            formId={'1234'}
            onLoad={(formObject) => {
                // Setter: doesn't need await
                formObject.submittable(false);

                // Getter: needs async/await
                (async () => {
                    const isSubmittable = await formObject.submittable();
                })();
            }}
        />
    );
}
```

##### `.allFieldsFilled()`

This method will return a `Promise<boolean>`, so if you need to use the return value for something, you'll need to use the `await` operator. For example:

```tsx
export default function Page() {
    return (
        <MarketoForm
            formId={'1234'}
            onLoad={(formObject) => {
                (async () => {
                    const allFieldsHaveValues = await formObject.allFieldsFilled();
                })();
            }}
        />
    );
}
```
