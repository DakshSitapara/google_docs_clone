import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    button: {
      addButton: (options: {
        text?: string;
        href?: string;
        variant?: "primary" | "secondary" | "danger";
        backgroundColor?: string;
        width?: string;
        height?: string;
      }) => ReturnType;
    };
  }
}

export const ButtonExtension = Node.create({
  name: "button",

  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      text: {
        default: "Click me",
      },
      href: {
        default: "#",
      },
      variant: {
        default: "primary",
      },
      backgroundColor: {
        default: "#007bff",
      },
      width: {
        default: "auto",
      },
      height: {
        default: "auto",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "a[data-button]",
        getAttrs: (node) => {
          if (typeof node === "string") return {};
          const element = node as HTMLElement;
          return {
            text: element.innerText,
            href: element.getAttribute("href"),
            variant: element.getAttribute("data-variant") || "primary",
            backgroundColor: element.getAttribute("data-bg-color") || "#007bff",
            width: element.getAttribute("data-width") || "auto",
            height: element.getAttribute("data-height") || "auto",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    let variantStyles = "";
    const backgroundColor = HTMLAttributes.backgroundColor || "#007bff";

    switch (HTMLAttributes.variant) {
      case "secondary":
        variantStyles = `background-color: gray;`;
        break;
      case "danger":
        variantStyles = `background-color: red;`;
        break;
      case "primary":   
      default:  
        variantStyles = `background-color: ${backgroundColor};`;
        break;
    }

    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        "data-button": "true",
        "data-variant": HTMLAttributes.variant,
        "data-bg-color": backgroundColor,
        "data-width": HTMLAttributes.width,
        "data-height": HTMLAttributes.height,
        class: "tiptap-button",
        style: `padding: 4px 10px; color: white; border-radius: 4px; text-decoration: none; display: inline-block; ${variantStyles}; width: ${HTMLAttributes.width}px; height: ${HTMLAttributes.height}px;`,
      }),
      HTMLAttributes.text,
    ];
  },

  addCommands() {
    return {
      addButton:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              text: options.text || "Click me",
              href: options.href || "#",
              variant: options.variant || "primary",
              backgroundColor: options.backgroundColor || "#007bff",
              width: options.width || "auto",
              height: options.height || "auto",
            },
          });
        },
    };
  },
});