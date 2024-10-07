import AuthLayout from '../component/layouts/AuthLayout'

const Home = () => {
    return (
            <AuthLayout>
                <header className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Hi, admin have a nice day</p>
                    <i className="fas fa-user text-black text-xl"></i>
                </header>

                <section className="flex flex-col gap-y-5 items-center">
                    <h1 className="text-xl font-bold">Home</h1>
                </section>
            </AuthLayout>
    )
}

export default Home