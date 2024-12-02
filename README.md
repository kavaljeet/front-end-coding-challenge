# Fido & Bingo

Implementation of Figma design to shopify dawn them.

**Shopify Preview link:** https://jodev-kaval.myshopify.com/

## Description

Refered to the Figma design for the layout, and implement designs in the Shopify store using the `Dawn theme` and make sure that the style, structure, and functionality are perfectly match with the design specifications

## Getting Started

- Starter with clean Dawn theme on shopify.

## Approach

All the changes are made as per figma design and followed the best practices. 

- Implemented a responsive, mobile-friendly design using shopify Dawn theme.
- Ensure the content easily update and using the Shopify wherever possible.
- Implemented WCAG guidelines to ensure accessibility on the homepage
- Added custom sections for the featured product on the home page.
- Placement of Menu logo and functional icons according to figma design.
- Developed custom made using liquid and schema we can add and update the elements.
-  CSS based done on on the `assets/base.css`

## Custom Sections

- Product Collection: Tag of products image in tabular part are rendering from product tag.
- Developed and implement feature Tabs functionality “Dog to cat and cat to dog” on home page 
- Added language selector on the header section.
- Customized the footer section to enable future edits.
- Product metafield: Bullet point listing in the tabular part are rendering from product metafield.
- Product Tags: Top right tag of products image in tabular part are rendering from product tag. 

## WCAG 

Fixed and improved the website's accessibility to meet 100% compliance with WCAG standards. This includes implementing various accessibility changes to enhance usability for all users.

- Improved the accessibility for all the HTML elements and provide relavent attribute and definition.
- Adjusted the color contrast in key areas of the homepage, including the promo code 'code20FB' on the image banner.
- Enhanced the text color contrast in the newsletter section to improve visibility.

## Browser Tested 

I have tested the code on following browsers:

- Chrome
- Mozila Firefox
- Safari
- Microsoft Edge

## Breaking Change 

Footer section: Term condition,privacy policy and copyright text part and “By subscribing, you agree to our terms.” inside  the newsletter section is hardcoded in the sections/footer.liquid section. Future theme updates might overwrite this section, requiring manual reintegration.

## How did I setup and run locally

Open the terminal and follow the below steps:

- Install the Shopify CLI `npm install -g @shopify/cli`
- Pull the them it will ask the crendential `shopify theme pull --store=jodev-kaval`
- Navigate to the them directory and run command `shopify theme dev`
- Open browser  `http://127.0.0.1:9292/`



## Bonus Task 

Create new app that utilized `Checkout UI Extensions` to develop a custom solution that blocks PO box entries in the address form during the Shopify checkout process.

I generate two app and pushed them inside the partners portal    

[checkout-po-box-restriction](https://partners.shopify.com/1549502/apps/190537367553/overview) (Installed/ Active)

`[checkout-ui-po-box-restriction](https://partners.shopify.com/1549502/apps/190529241089/overview)

Below are the modifications I made during the development process in `/extensions/checkout-po-box-restriction/src/checkout.tsx`. The code should work as expected; however, I couldn't test the app due to ``EACCES: permission denied` error

```
import {
  reactExtension,
  useBuyerJourneyIntercept,
  useExtensionApi,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { buyerJourney } = useExtensionApi();

  // Intercept the checkout flow
  useBuyerJourneyIntercept((state) => {
    const shippingAddress = state?.shippingAddress;

    // Condition checks and throw error if the entered address contains a PO Box
    if (
      shippingAddress?.address1 &&
      /P\.?O\.?\s*Box/i.test(shippingAddress.address1)
    ) {
      return {
        behavior: "block",
        reason: "Invalid Address",
        errors: [
          {
            target: "shippingAddress",
            message:
              "We cannot ship to PO boxes",
          },
        ],
      };
    }

    // Allow to proceed if no PO Box is detected
    return { behavior: "allow" };
  });

  return null;
}
```



## Author

<a href="mailto:kavaljeet@gmail.com">Kaval Waraich</a>

