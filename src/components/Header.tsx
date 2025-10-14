import React from "react";
import Search from "./SearchInput.js";
import { Link, NavLink } from "react-router";
import { Select } from "radix-ui";
import { useSearchStore } from "../stores/bookStore.js";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

function Header() {
  const searchCategory = useSearchStore((state) => state.searchCategory);
  const setSearchCategory = useSearchStore((state) => state.setSearchCategory);

  return (
    <div className="w-full border-b-1 border-ctp-surface0 sticky top-0 bg-ctp-base z-10 mb-3 text-ctp-text flex justify-center">
      <div className="grid grid-cols-6 items-center text-center divide-x-1 divide divide-ctp-surface1 px-4">
        <NavLink to="/">
          {({ isActive }) => (
            <div
              className={`py-2 hover:bg-ctp-surface0 ${
                isActive ? "font-bold text-ctp-mauve" : ""
              } `}
            >
              Search
            </div>
          )}
        </NavLink>
        <NavLink to="/books">
          {({ isActive }) => (
            <div
              className={`py-2 hover:bg-ctp-surface0 ${
                isActive ? "font-bold text-ctp-mauve" : ""
              } `}
            >
              Books
            </div>
          )}
        </NavLink>
        <div className="py-2 hover:bg-ctp-surface0 line-through">Manga</div>
        <div className="py-2 hover:bg-ctp-surface0 line-through">Anime</div>
        <div className="py-2 hover:bg-ctp-surface0 line-through">Movies</div>
        <div className="pl-2 py-2 hover:bg-ctp-surface0 line-through">
          TV Shows
        </div>
      </div>

      <Search />

      <Select.Root
        value={searchCategory}
        onValueChange={(value) => setSearchCategory(value as any)}
      >
        <Select.Trigger
          className="border-3 border-ctp-surface0 rounded-xl w-33 ml-3 my-3 flex items-center px-3 gap-2 hover:border-ctp-mauve justify-between"
          aria-label="Category"
        >
          <Select.Value placeholder="Select a category..." />
          <Select.Icon className="SelectIcon">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            alignOffset={6}
            className="SelectContent z-10 bg-ctp-surface0 text-ctp-text rounded-lg show-lg p-3 border-2 border-ctp-surface1"
          >
            <Select.ScrollUpButton className="SelectScrollButton">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="">
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="manga">Manga</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="movies">Movies</SelectItem>
              <SelectItem value="shows">Shows</SelectItem>
            </Select.Viewport>
            <Select.ScrollDownButton className="SelectScrollButton">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={"hover:bg-ctp-surface1 rounded-md py-1 px-1.5"}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      {/* <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator> */}
    </Select.Item>
  );
});

export default Header;
