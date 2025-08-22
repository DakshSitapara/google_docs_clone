import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    button: {
      addButton: (options: {
        text?: string;
        href?: string;
        variant?: "primary" | "secondary" | "danger" | "ghost";
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
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    let variantStyles = "";

    switch (HTMLAttributes.variant) {
      case "secondary":
        variantStyles = "background-color: gray;";
        break;
      case "danger":
        variantStyles = "background-color: red;";
        break;
      case "primary":
      default:
        variantStyles = "background-color: #007bff;";
        break;
    }

    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        "data-button": "true",
        "data-variant": HTMLAttributes.variant,
        class: "tiptap-button",
        style: `padding: 4px 10px; color: white; border-radius: 4px; text-decoration: none; ${variantStyles}`,
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
            },
          });
        },
    };
  },
});
