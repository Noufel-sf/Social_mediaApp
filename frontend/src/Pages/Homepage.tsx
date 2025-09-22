import FirstColumn from '../Components/FirstColumn'
import SecondColumn from '../Components/SecondColumn'
import ThirdColumn from '../Components/ThirdColumn'
import Topbar from '../Components/TopBar'



function Homepage() {
  return (
    <section className="container mx-auto px-4">
      <Topbar />
      <div className="flex flex-col md:flex-row md:justify-between gap-8 py-12">
        <FirstColumn />
        <SecondColumn />
        <ThirdColumn />
      </div>
    </section>
  )
}

export default Homepage