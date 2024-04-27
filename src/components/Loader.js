import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <span className={styles.loader} ></span>
    </div>
  )
}

export default Loader