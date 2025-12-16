// app/theme-script.tsx
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
            (function () {
              document.documentElement.classList.add('dark');
            })();
          `,
      }}
    />
  );
}
