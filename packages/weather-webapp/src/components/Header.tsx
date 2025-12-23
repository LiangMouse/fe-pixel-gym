import SettingDropdown from "./SettingDropdown"

const Header = () => {
  return (
    <header className="flex mx-10 my-5 justify-between">
      <section className="flex items-center ml-5">
        <img src="/assets/images/logo.svg" alt="Logo" />
      </section>
      <SettingDropdown />
    </header>
  )
}

export default Header
