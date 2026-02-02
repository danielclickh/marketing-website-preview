## Getting Started

### Configure environment

- install `node v22.x`.

```bash
brew install nvm
nvm install 22
```

### Install yarn dependencies

You need to install `yarn` packages for every project separately.
Navigate to a project folder and run `yarn`.

### Environment variables

1. Copy the `.env.example` to `.env`
2. Ask for the credentials for the project in the [#website](https://clickhouse-inc.slack.com/archives/C02FCQ30GKA) Slack channel.

#### Public environment variables
> Exposed to the client (prefixed with `NEXT_PUBLIC_`)

| Variable                                  | Description                                                                                                     |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| NEXT_PUBLIC_IS_PROD                       | When `true`, staging filters are applied to Strapi requests and tracking scripts are loaded.                    |
| NEXT_PUBLIC_URL                           | (optional) By default, generated absolute URLs will default to `clickhouse.com`. Use this variable to override. |
| NEXT_PUBLIC_PROTOCOL                      | (optional) By default, generated absolute URLs will default to `https://`. Use this variable to override.       |
| NEXT_PUBLIC_GROWTHBOOK_API_HOST           | GrowthBook API host used for A/B testing.                                                                       |
| NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY         | Public client key for GrowthBook A/B testing.                                                                   |
| NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY     | Decryption key used by GrowthBook to decrypt feature payloads on the client.                                    |
| NEXT_PUBLIC_STRIPE_BUTTON_PUBLISHABLE_KEY | Publishable Stripe key used by payment-enabled events and flows.                                                |
| NEXT_PUBLIC_ALGOLIA_APP_ID                | Application ID of the Algolia project the website reads from and writes to.                                     |
| NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY        | Public API key used to authenticate Algolia search requests on the frontend.                                    |

#### Private environment variables
> Must never be exposed to the client

| Variable             | Description                                                                                  |
|----------------------|----------------------------------------------------------------------------------------------|
| SLACK_TOKEN          | Used by the check-install script to post Slack updates about the status of the curl install. |
| M3TER_API_ENDPOINT   | API endpoint used to fetch pricing data from m3ter.                                          |
| M3TER_ORG_ID         | The m3ter organization ID.                                                                   |
| M3TER_API_KEY        | API key used to authenticate requests to m3ter.                                              |
| M3TER_API_SECRET     | API secret used alongside the m3ter API key.                                                 |
| STRAPI_WEBHOOK_TOKEN | Token used to authenticate incoming webhooks from Strapi.                                    |
| ALGOLIA_ADMIN_KEY    | Admin API key used for write operations in Algolia.                                          |

## Getting started

First, run the development server:

```bash
yarn dev
```

---

## Google Analytics

### Google Tag Gateway

To make our analytics more resiliant to ad blockers and privacy tools, we serve our Google Analytics from our first-party domain. This is defined by the `gtmScriptUrl` property.

- [Google documentation](https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide?setup=manual) 
- [Next.js documentation](https://nextjs.org/docs/app/guides/third-party-libraries#server-side-tagging)

```tsx
<GoogleTagManager
  gtmId='GTM-WKSRXS8S'
  gtmScriptUrl='https://clickhouse.com/gtmwksrxs8s/' // Trailing slash required!
/>
```

### Bot scoring

When viewing page source of the clickhouse.com website you'll find a script tag like the below. This tag is injected at the edge via our Cloudflare worker, Google Tag Manager uses this to score all Google Analytics events.

```html
<script>
 (function(){
  try {
    window.__cfbm = {
     score: 99,
     verified: false,
     category: "",
     bucket: "unlikely-automated"
    }
    window.sessionStorage.setItem('__cfbm', JSON.stringify(window.__cfbm))
  } catch(e) {}
 })()
</script>
```

1. Bot scores are injected into the HTML at the edge: [clickhouse-website-worker](https://github.com/ClickHouse/clickhouse-website-worker/).
2. Google Tag Manager reads the values from the `window.__cfbm` object and passes them to Google Analytics
3. Inside Google Analytics, each value is defined as custom definition:
   - `cfbm_bucket`
   - `cfbm_category`
   - `cfbm_score`
   - `cfbm_verified`

---

## Tailwind Gradient Masks

A custom Tailwind plugin has been created to apply CSS gradient masks using Tailwind utilities.

Use the `.gradient-mask-*` utilities in combination with the [gradient colour stop position](https://v3.tailwindcss.com/docs/gradient-color-stops#specifying-stop-positions) utilities to give an element a linear gradient mask.

### Examples

```html
<div class="h-14 gradient-mask-to-t"></div>
<div class="h-14 gradient-mask-to-r from-10% to-50%"></div>
<div class="h-14 gradient-mask-to-b from-40% via-70% to-100%"></div>
```

### Directions

- **Top:** `gradient-mask-to-t`
- **Top Right:** `gradient-mask-to-tr`
- **Right:** `gradient-mask-to-r`
- **Bottom Right:** `gradient-mask-to-br`
- **Bottom:** `gradient-mask-to-b`
- **Bottom Left:** `gradient-mask-to-bl`
- **Left:** `gradient-mask-to-l`
- **Top Left:** `gradient-mask-to-tl`

### Arbitrary Values

If you need to use a one-off `mask-image` value that doesn’t make sense to include in your theme, use square brackets to generate a property on the fly using any arbitrary value.

```html
<div class="gradient-mask-to-t-[rgba(0,0,0,0)_0%,rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,rgba(0,0,0,0)_100%]">
    <!-- ... -->
</div>
```

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

##### `.getFormElem()`

This method is unavailable due to the inability to pass an element reference between the parent window and iframe.

##### `.showErrorMessage(message: string): void`

In the official documentation, you will find a second parameter designed for passing an element for the error to point to. However, due to the inability to pass an element reference between the parent window and iframe, this parameter has been omitted. Instead, the message will always point to the submit button.

##### `.validate(): Promise<boolean>`

This method will return a `Promise<boolean>`, so if you need to use the return value for something, you'll need to use the `await` operator. For example:

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

##### `.getValues(): Promise<Record<string, any>>`

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

##### `.submittable(canSubmit?: boolean): Promise<boolean>` (alias: `.submitable()`)

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

##### `.allFieldsFilled(): Promise<boolean>`

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

##### `.vals(values?: Record<string, any>): undefined | Promise<Record<string, any>>`

This method will return a `Record<string, any>` if the values paramater is set, so if you need to use the return value for something, you'll need to use the `await` operator. For example:

```tsx
export default function Page() {
    return (
        <MarketoForm
            formId={'1234'}
            onLoad={(formObject) => {
                // Setter: doesn't need await
                formObject.vals({ name: 'Bob Ross' });

                // Getter: needs async/await
                (async () => {
                    const fieldValues = await formObject.vals();
                })();
            }}
        />
    );
}
```
