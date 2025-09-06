import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import ToastViewport from './components/ui/toast-viewport'
import { AuthProvider } from './context/auth-context'
import Dashboard from './routes/dashboard'
import Home from './routes/home'
import NotFound from './routes/not-found'
import PostNew from './routes/post-new'
import Posts from './routes/posts'
import Profile from './routes/profile'
import SignIn from './routes/sign-in'
import SignUp from './routes/sign-up'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="wrap" role="main">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastViewport />
    </div>
  )
}
