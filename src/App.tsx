import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHistory,
  faTh,
  faFlask,
  faArrowTrendUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const dropdownRefDesktop = useRef<HTMLDivElement>(null);
  const dropdownRefMobile = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [openAppList, setOpenAppList] = useState<boolean>(false);
  const appList = [
    "Account",
    "Search",
    "Business Profile Manager",
    "Maps",
    "Youtube",
    "Gemini",
    "News",
    "Gmail",
    "Meet",
    "Chat",
    "Contacts",
    "Drive",
    "Calendar",
    "Play",
  ];
  const suggestionList = [
    "aaaa",
    "bbbb",
    "abccc",
    "ccccc",
    "bbbbccc",
    "dddddd",
    "aaaasdd",
    "cccbb",
  ];
  const filteredList = search
    ? suggestionList.filter((e: string) => e.includes(search))
    : suggestionList;
  const trendingSearch = [
    "australian dollar",
    "jd vance",
    "skibidi toilet film",
    "frankfurt airport",
    "31st mechanized brigade",
    "searchgpt",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefDesktop.current &&
        !dropdownRefDesktop.current.contains(event.target as Node) &&
        dropdownRefMobile.current &&
        !dropdownRefMobile.current.contains(event.target as Node)
      ) {
        setOpenAppList(false);
      }

      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const DivApp = () => {
    return (
      <>
        <div
          className={`header-icon${openAppList ? "-active" : ""}`}
          onClick={() => setOpenAppList(!openAppList)}
        >
          <FontAwesomeIcon icon={faTh} />
        </div>
        {openAppList && (
          <div className="applist-container">
            <div className="applist-sub">
              <div className="applist">
                {appList.map((e) => {
                  return (
                    <div className="app-icon">
                      <div className="mock-icon" />
                      <div className="app-name">{e}</div>
                    </div>
                  );
                })}
              </div>
              <div className="more-button">More from Google</div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header-text">Gmail</div>
        <div className="header-text">Images</div>
        <div className="header-icon">
          <FontAwesomeIcon icon={faFlask} />
        </div>
        <div ref={dropdownRefDesktop}>{DivApp()}</div>
        <div className="icon-name">I</div>
      </div>
      {/* header mobile */}
      <div className="header-mobile">
        <div className="flex">
          <div className="text">ALL</div>
          <div className="text">IMAGES</div>
        </div>
        <div className="flex">
          <div ref={dropdownRefMobile}>{DivApp()}</div>
          <div className="icon-name">I</div>
        </div>
      </div>

      <div className="main">
        <img className="logo" src="googlelogo.png" />
        <div
          ref={inputRef}
          className={`input-container${
            focused && filteredList.length > 0 ? "-active" : ""
          }`}
        >
          <div className="input-box">
            <FontAwesomeIcon icon={faSearch} className="icon-search" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onFocus={() => setFocused(true)}
            />
            {search && search.length > 0 && (
              <FontAwesomeIcon
                icon={faXmark}
                className="clear-icon"
                onClick={() => {
                  setSearch("");
                }}
              />
            )}
          </div>

          {focused && filteredList.length > 0 && (
            <div className="suggestion-list">
              {filteredList.map((e: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => {
                      setSearch(e);
                      setFocused(false);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHistory}
                      className="suggestion-icon"
                    />
                    {e}
                  </div>
                );
              })}
              <div className="flex-button">
                <div className="button">Google Search</div>
                <div className="button">I'm Feeling Lucky</div>
              </div>
            </div>
          )}
        </div>
        <div className="flex-button">
          <div className="button">Google Search</div>
          <div className="button">I'm Feeling Lucky</div>
        </div>
        <div className="lang-text">
          Google offered in: <a>ภาษาไทย</a>
        </div>

        {/* only mobile */}
        <div className="mobile trending">
          <div className="trending-head">Trending searches</div>
          {trendingSearch.map((e, index) => {
            return (
              <div key={index} className="trending-list">
                <FontAwesomeIcon icon={faArrowTrendUp} className="trend-icon" />
                {e}
              </div>
            );
          })}
        </div>
      </div>

      <div className="footer">
        <div className="footer-row">Thailand</div>
        <div className="footer-row tb">
          <div className="desktop subfooter">
            <div className="subfooter-box">About</div>
            <div className="subfooter-box">Advertising</div>
            <div className="subfooter-box">Business</div>
            <div className="subfooter-box">How Search works</div>
          </div>
          <div className="subfooter">
            <div className="subfooter-box">Privacy</div>
            <div className="subfooter-box">Terms</div>
            <div className="subfooter-box">Settings</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
