import { useState, useEffect } from "react";
import { Box, Button, Heading, Text, VStack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";

const Index = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" color={textColor}>
          Pomodoro Timer
        </Heading>
        <Text fontSize="6xl" color={textColor}>
          {formatTime(time)}
        </Text>
        <Box>
          {!isRunning ? (
            <Button leftIcon={<FaPlay />} colorScheme="green" size="lg" onClick={handleStart}>
              Start
            </Button>
          ) : (
            <Button leftIcon={<FaPause />} colorScheme="yellow" size="lg" onClick={handlePause}>
              Pause
            </Button>
          )}
          <Button leftIcon={<FaSync />} colorScheme="red" size="lg" ml={4} onClick={handleReset}>
            Reset
          </Button>
        </Box>
        <Button onClick={toggleColorMode}>Toggle Theme</Button>
      </VStack>
    </Box>
  );
};

export default Index;
