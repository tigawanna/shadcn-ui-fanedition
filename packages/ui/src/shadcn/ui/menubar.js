"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenubarShortcut = exports.MenubarSub = exports.MenubarGroup = exports.MenubarSubTrigger = exports.MenubarSubContent = exports.MenubarPortal = exports.MenubarRadioItem = exports.MenubarRadioGroup = exports.MenubarCheckboxItem = exports.MenubarLabel = exports.MenubarSeparator = exports.MenubarItem = exports.MenubarContent = exports.MenubarTrigger = exports.MenubarMenu = exports.Menubar = void 0;
var React = __importStar(require("react"));
var MenubarPrimitive = __importStar(require("@radix-ui/react-menubar"));
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/shadcn/lib/utils");
var MenubarMenu = MenubarPrimitive.Menu;
exports.MenubarMenu = MenubarMenu;
var MenubarGroup = MenubarPrimitive.Group;
exports.MenubarGroup = MenubarGroup;
var MenubarPortal = MenubarPrimitive.Portal;
exports.MenubarPortal = MenubarPortal;
var MenubarSub = MenubarPrimitive.Sub;
exports.MenubarSub = MenubarSub;
var MenubarRadioGroup = MenubarPrimitive.RadioGroup;
exports.MenubarRadioGroup = MenubarRadioGroup;
var Menubar = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<MenubarPrimitive.Root ref={ref} className={(0, utils_1.cn)("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)} {...props}/>);
});
exports.Menubar = Menubar;
Menubar.displayName = MenubarPrimitive.Root.displayName;
var MenubarTrigger = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<MenubarPrimitive.Trigger ref={ref} className={(0, utils_1.cn)("flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className)} {...props}/>);
});
exports.MenubarTrigger = MenubarTrigger;
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;
var MenubarSubTrigger = React.forwardRef(function (_a, ref) {
    var className = _a.className, inset = _a.inset, children = _a.children, props = __rest(_a, ["className", "inset", "children"]);
    return (<MenubarPrimitive.SubTrigger ref={ref} className={(0, utils_1.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", inset && "pl-8", className)} {...props}>
    {children}
    <lucide_react_1.ChevronRight className="ml-auto h-4 w-4"/>
  </MenubarPrimitive.SubTrigger>);
});
exports.MenubarSubTrigger = MenubarSubTrigger;
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;
var MenubarSubContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<MenubarPrimitive.SubContent ref={ref} className={(0, utils_1.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1", className)} {...props}/>);
});
exports.MenubarSubContent = MenubarSubContent;
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;
var MenubarContent = React.forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.align, align = _b === void 0 ? "start" : _b, _c = _a.alignOffset, alignOffset = _c === void 0 ? -4 : _c, _d = _a.sideOffset, sideOffset = _d === void 0 ? 8 : _d, props = __rest(_a, ["className", "align", "alignOffset", "sideOffset"]);
    return (<MenubarPrimitive.Portal>
      <MenubarPrimitive.Content ref={ref} align={align} alignOffset={alignOffset} sideOffset={sideOffset} className={(0, utils_1.cn)("z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in slide-in-from-top-1", className)} {...props}/>
    </MenubarPrimitive.Portal>);
});
exports.MenubarContent = MenubarContent;
MenubarContent.displayName = MenubarPrimitive.Content.displayName;
var MenubarItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, inset = _a.inset, props = __rest(_a, ["className", "inset"]);
    return (<MenubarPrimitive.Item ref={ref} className={(0, utils_1.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className)} {...props}/>);
});
exports.MenubarItem = MenubarItem;
MenubarItem.displayName = MenubarPrimitive.Item.displayName;
var MenubarCheckboxItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, checked = _a.checked, props = __rest(_a, ["className", "children", "checked"]);
    return (<MenubarPrimitive.CheckboxItem ref={ref} className={(0, utils_1.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} checked={checked} {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <lucide_react_1.Check className="h-4 w-4"/>
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>);
});
exports.MenubarCheckboxItem = MenubarCheckboxItem;
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;
var MenubarRadioItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (<MenubarPrimitive.RadioItem ref={ref} className={(0, utils_1.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <lucide_react_1.Circle className="h-2 w-2 fill-current"/>
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>);
});
exports.MenubarRadioItem = MenubarRadioItem;
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;
var MenubarLabel = React.forwardRef(function (_a, ref) {
    var className = _a.className, inset = _a.inset, props = __rest(_a, ["className", "inset"]);
    return (<MenubarPrimitive.Label ref={ref} className={(0, utils_1.cn)("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} {...props}/>);
});
exports.MenubarLabel = MenubarLabel;
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;
var MenubarSeparator = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<MenubarPrimitive.Separator ref={ref} className={(0, utils_1.cn)("-mx-1 my-1 h-px bg-muted", className)} {...props}/>);
});
exports.MenubarSeparator = MenubarSeparator;
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;
var MenubarShortcut = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<span className={(0, utils_1.cn)("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props}/>);
};
exports.MenubarShortcut = MenubarShortcut;
MenubarShortcut.displayname = "MenubarShortcut";
