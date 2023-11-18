import './style.scss';
import classNames from 'classnames';
interface LoaderProps {
  global?: boolean;
  className?: string;
}

const Loader = ({ global, className }: LoaderProps) => {
  return (
    <div
      className={classNames(
        {
          'loader-container': global,
        },
        className
      )}
    >
      <div className="loader">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Loader;
