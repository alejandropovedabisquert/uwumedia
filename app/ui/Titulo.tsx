import clsx from "clsx";
import React from "react";

export const Titulo = ({ as = 'h1', children, className = '', position } : {as: keyof React.ReactHTML, children: React.ReactNode, className?: string, position?: string}) => {
    const Component = as;  // Usa el tipo de encabezado proporcionado o 'h1' por defecto
    const baseStyles = clsx(
        "uppercase tracking-widest grid grid-cols-title grid-rows-title gap-4",
        "before:content-[''] before:block before:border-b-2 before:border-secondary-color",
        "after:content-[''] after:block after:border-b-2 after:border-secondary-color",
        {
            "grid-cols-title md:grid-cols-left-side": position == "left",
            "grid-cols-title md:grid-cols-right-side": position == "right"
        }
    )
    return (
      <Component className={`${baseStyles} ${className}`}>
        {children}
      </Component>
    );
};